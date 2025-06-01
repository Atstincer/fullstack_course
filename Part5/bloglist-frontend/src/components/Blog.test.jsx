import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect } from 'vitest'

describe('<Blog /> component', () => {

  let container
  
  beforeEach(() => {
    const blog = {
      title: 'Blog of some content',
      author: 'Pedro Perez',
      url: 'http://something.com',
      likes: 3,
      user: {
        name: 'Pedro'
      }
    }

    container = render(<Blog blog={blog} addOneLike={() => { }} removeBlog={() => { }} />).container
  })

  test('Blog components renders by default only the title and author', () => {
    //blogs name and author gets display by default
    const element = screen.getByText('Blog of some content Pedro Perez')

    //not necesary
    expect(element).toBeDefined()

    //screen.debug(element)

    const urlDiv = container.querySelector('.div_url')
    const likesDiv = container.querySelector('.div_likes')

    expect(urlDiv).toBeNull()
    expect(likesDiv).toBeNull()

    const urlElement = screen.queryByText('http://something.com')
    expect(urlElement).toBeNull()
  })

  test('url and likes are displayed after button show gets cliked', async () => {
    const user = userEvent.setup()
    
    const btnShowDetails = container.querySelector('#btn_show_details')

    await user.click(btnShowDetails)

    const urlDiv = container.querySelector('.div_url')
    const likesDiv = container.querySelector('.div_likes')

    expect(urlDiv).toBeDefined()
    expect(likesDiv).toBeDefined()
  })
})

test('event handler for adding likes works fine', async () => {
  const blog = {
      title: 'Blog of some content',
      author: 'Pedro Perez',
      url: 'http://something.com',
      likes: 3,
      user: {
        name: 'Pedro'
      }
    }

    const user = userEvent.setup()
    const addLikes = vi.fn()

    const { container } = render(<Blog blog={blog} addOneLike={ addLikes } removeBlog={() => { }} />)

    const btnShowDetails = container.querySelector('#btn_show_details')
    await user.click(btnShowDetails)
    
    const btnAddOneLike = container.querySelector('#btn_addonelike')
    await user.click(btnAddOneLike)
    await user.click(btnAddOneLike)

    //console.log('mock_calls:',addLikes.mock.calls)
    expect(addLikes.mock.calls).toHaveLength(2)
})