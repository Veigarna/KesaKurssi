import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders title and author, not likes', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'http//Test',
    likes: 0,
    user: 'Test User',
  }

  render(<Blog blog={blog} />)
  //title
  const title = screen.getByTestId('blog-title')
  screen.debug(title)
  expect(title).toBeDefined()
  //author
  const author = screen.getByTestId('blog-author')
  screen.debug(author)
  expect(author).toBeDefined()
  //likes ei näy
  const likes = screen.queryByTestId('blog-likes')
  screen.debug(likes)
  expect(likes).toBeNull()
})

test('renders all when view clicked', async () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'http//Test',
    likes: 0,
    user: 'Test User',
  }

  render(<Blog blog={blog} v />)
  const user = userEvent.setup()
  const viewBtn = screen.getByTestId('view-click')

  await user.click(viewBtn)

  //title
  const title = screen.getByTestId('blog-title')
  screen.debug(title)
  expect(title).toBeDefined()
  //author
  const author = screen.getByTestId('blog-author')
  screen.debug(author)
  expect(author).toBeDefined()
  //likes näkyy
  const likes = screen.queryByTestId('blog-likes')
  screen.debug(likes)
  expect(likes).toBeDefined()
  //url näkyy
  const url = screen.queryByTestId('blog-url')
  screen.debug(url)
  expect(url).toBeDefined()
})
test('painaa like nappia 2 kertaa', async () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'http//Test',
    likes: 0,
    user: 'Test User',
  }
  const handleLikeMock = vi.fn()
  render(<Blog blog={blog} handleLike={handleLikeMock} />)

  const user = userEvent.setup()
  const viewBtn = screen.getByTestId('view-click')
  //avaa näkymän
  await user.click(viewBtn)

  const likeButton = screen.getByTestId('like-click')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(handleLikeMock.mock.calls).toHaveLength(2)
})
