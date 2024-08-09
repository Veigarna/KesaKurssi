import { render, screen, fireEvent } from '@testing-library/react'
import BlogForm from './AddBlogForm'
import userEvent from '@testing-library/user-event'

test('Form testi, add new blog', async () => {
  const blog = {
    author: 'Test Author',
    title: 'Test Title',
    url: 'http://test.com',
  }
  const user = userEvent.setup()
  const handleAddMock = vi.fn()

  render(<BlogForm handleAdd={handleAddMock} />)

  const Titleinput = screen.getByPlaceholderText('typeTitle')
  const Authorinput = screen.getByPlaceholderText('typeAuthor')
  const Urlinput = screen.getByPlaceholderText('typeUrl')
  const AddBtn = screen.getByTestId('Add-click')

  await user.type(Titleinput, 'Test Title')
  await user.type(Authorinput, 'Test Author')
  await user.type(Urlinput, 'http://test.com')

  await user.click(AddBtn)
  //expect(handleAddMock).toHaveBeenCalledTimes(1)
  expect(handleAddMock).toHaveBeenCalledWith({
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://test.com',
  })
})
