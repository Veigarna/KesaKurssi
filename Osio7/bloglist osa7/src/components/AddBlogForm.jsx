import { useState } from 'react'
import PropTypes from 'prop-types'

//tyylit
import { Table, Form, Button } from 'react-bootstrap'

const ShowAddBlog = ({ handleAdd }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  ShowAddBlog.propTypes = {
    handleAdd: PropTypes.func.isRequired,
  }

  console.log('Add Load')

  const addBlog = (event) => {
    event.preventDefault()
    handleAdd({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h3>Lisää blogi</h3>
      <div>
        title
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder="typeTitle"
        />
      </div>
      <div>
        author
        <input
          type="author"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="typeAuthor"
        />
      </div>
      <div>
        url
        <input
          type="url"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder="typeUrl"
        />
      </div>
      <Button
        variant="success"
        data-testid="Add-click"
        type="submit"
        style={{ marginTop: '10px', marginBottom: '10px' }}
      >
        Add Blog
      </Button>
    </form>
  )
}

export default ShowAddBlog
