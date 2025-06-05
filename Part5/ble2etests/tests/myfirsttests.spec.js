const { test, expect, beforeEach, describe } = require('@playwright/test')
const helper = require('./helper')
const { title } = require('process')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    //clears the db
    await request.post('http://localhost:5173/api/testing/reset')

    //creates a user
    await request.post('http://localhost:5173/api/users', {
      data: {
        username: 'pedrohm',
        name: 'Pedro',
        password: '1234'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('pedrohm')
      await page.getByTestId('password').fill('1234')
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('pedrohm logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('pedrogh')
      await page.getByTestId('password').fill('12')
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByTestId('errormsg_div')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await helper.loginWith(page, 'pedrohm', '1234')
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await expect(page.getByText('create new')).toBeVisible()

      await page.getByPlaceholder('writte yor title hear').fill('Mi blog de carpinteria')
      await page.getByPlaceholder('writte the author hear').fill('Jesus')
      await page.getByPlaceholder('writte the url hear').fill('http://something...com')
      await page.getByRole('button', { name: 'create' }).click()

      const blogDiv = page.getByTestId('blog_info_div')
      await expect(blogDiv).toBeVisible()
      await expect(blogDiv.getByText('Mi blog de carpinteria')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await helper.saveNewBlog(page, {
        title: 'Mi blog de religion',
        author: 'Belkis',
        url: 'http://something...com'
      })
      //const newBlogDiv = page.getByTestId('blog_info_div')
      const newBlogDiv = page.getByText('Mi blog de religion')
      await newBlogDiv.getByRole('button', { name: 'show' }).click()
      await expect(newBlogDiv.getByTestId('div_blogDetails')).toBeVisible()
      newBlogDiv.getByRole('button', { name: 'like' }).click()
      await expect(newBlogDiv.getByText('likes 1')).toBeVisible()
    })
  })

  describe('when logged in and creates a blog', () => {
    beforeEach(async ({ page }) => {
      await helper.loginWith(page, 'pedrohm', '1234')
      await helper.saveNewBlog(page, {
        title: 'Mi blog de carpinteria',
        author: 'Jesus',
        url: 'http://something...com'
      })
    })

    test('the user who creates a note can also delete it', async ({ page }) => {
      page.on('dialog', async (dialog) => await dialog.accept())

      const newBlogDiv = page.getByTestId('blog_info_div')
      await expect(newBlogDiv).toBeVisible()
      expect(newBlogDiv).toHaveText(/Mi blog de carpinteria/)
      newBlogDiv.getByRole('button', { name: 'show' }).click()
      newBlogDiv.getByRole('button', { name: 'remove' }).click()

      await expect(page.getByText('Blog delete successfully')).toBeVisible()
    })

    test('only the user that creates the blog sees the remove button', async ({ page, request }) => {
      //creates a new user
      //creates a user
      await request.post('http://localhost:5173/api/users', {
        data: {
          username: 'mariagh',
          name: 'Maria',
          password: '5678'
        }
      })

      await page.getByRole('button', { name: 'logout' }).click()
      await helper.loginWith(page, 'mariagh', '5678')
      const blogDiv = page.getByTestId('blog_info_div')
      await expect(blogDiv).toHaveText(/Mi blog de carpinteria/)
      await blogDiv.getByRole('button', { name: 'show' }).click()
      await expect(blogDiv.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test('blog with more likes is the first one', async ({ page }) => {
      await expect(page.getByText('Mi blog de carpinteria').and(page.getByTestId('blog_info_div'))).toBeVisible()
      await helper.saveNewBlog(page, {
        title: 'Blog with more likes',
        author: 'John Doe',
        url: 'http://something...com'
      })
      await expect(page.getByText('Blog with more likes').and(page.getByTestId('blog_info_div'))).toBeVisible()
      await helper.saveNewBlog(page, {
        title: 'Blog de manualidades',
        author: 'Maria',
        url: 'http://something...com'
      })    

      await expect(page.getByText('Blog de manualidades').and(page.getByTestId('blog_info_div'))).toBeVisible()

      await helper.likeTheBlog(page.getByText('Blog de manualidades').and(page.getByTestId('blog_info_div')))
      await helper.likeTheBlog(page.getByText('Blog de manualidades').and(page.getByTestId('blog_info_div')))
      await helper.likeTheBlog(page.getByText('Blog with more likes').and(page.getByTestId('blog_info_div')))
      await helper.likeTheBlog(page.getByText('Blog with more likes').and(page.getByTestId('blog_info_div')))
      await helper.likeTheBlog(page.getByText('Blog with more likes').and(page.getByTestId('blog_info_div')))
      
      await expect(page.getByTestId('blog_info_div')).toHaveCount(3)
      await expect(page.getByTestId('blog_info_div').first()).toContainText('Blog with more likes')
    })
  })
})