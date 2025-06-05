const loginWith = async (page, username, pasword) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(pasword)
  await page.getByRole('button', { name: 'Login' }).click()
}

const saveNewBlog = async (page, blog) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByPlaceholder('writte yor title hear').fill(blog.title)
  await page.getByPlaceholder('writte the author hear').fill(blog.author)
  await page.getByPlaceholder('writte the url hear').fill(blog.url)
  await page.getByRole('button', { name: 'create' }).click()
}

const likeTheBlog = async (blogLocator) => {
  await blogLocator.getByRole('button', { name: 'show' }).click()
  await blogLocator.getByRole('button', { name: 'like' }).click()
  await blogLocator.getByRole('button', { name: 'hide' }).click()
}

export { loginWith, saveNewBlog, likeTheBlog }