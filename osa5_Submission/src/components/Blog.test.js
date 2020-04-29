import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from  './Blog'
import NewBlog from './NewBlog'

describe('<Blog />', () => {
  let component, updateLikes

  beforeEach( () => {
    updateLikes = jest.fn()

    const newBlog = {
      title: 'test blog',
      author: 'JY Park',
      url: 'www.jyp.com',
      likes: 10000,
      user: [{ username: 'JYP', name: 'Park Jin-Young', id: '1234567' }]
    }

    const newUser = {
      username: 'JYP',
      name: 'Park Jin-Young',
      id: '123456'
    }

    window.localStorage.setItem('loggedinBlogAppUser', JSON.stringify(newUser))

    component = render(
      <Blog blog={newBlog} update={updateLikes}/>
    )
  })


  test('renders blog title and author, but not url/likes', () => {

    expect(component.container.querySelector('.abbrev')).toBeDefined()
    expect(component.container.querySelector('.abbrev')).not.toHaveStyle('display: none')
    expect(component.container.querySelector('.abbrev')).toHaveTextContent('test blog')
    expect(component.container.querySelector('.abbrev')).toHaveTextContent('JY Park')
    expect(component.container.querySelector('.abbrev')).not.toHaveTextContent('www.JYP.com')
    expect(component.container.querySelector('.abbrev')).not.toHaveTextContent('10000')

  })

  test('url and likes displayed when button to show full info is pressed', () => {

    const button = component.getByText('View')
    fireEvent.click(button)

    expect(component.container.querySelector('.full')).not.toHaveStyle('display: none')
  })

  test('if like button pressed 2x, event handler is instantiated 2x', () => {

    const button = component.getByText('View')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(component.container.querySelector('.full')).not.toHaveStyle('display: none')
    expect(updateLikes.mock.instances.length).toBe(2)
  })

})

describe('<NewBlog />', () => {
  test('form calls back submit function', () => {
    
    const createBlog = jest.fn()
    const component = render(
      <NewBlog createBlog={createBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const likes = component.container.querySelector('#likes')
    const form = component.container.querySelector('form')

    fireEvent.change(title, { target: { value: 'How Bout them Apples' } })
    fireEvent.change(author, { target: { value: 'Will Hunting' } })
    fireEvent.change(url, { target: { value: 'www.apples.net' } })
    fireEvent.change(likes, { target: { value: '314' } })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('How Bout them Apples')
    expect(createBlog.mock.calls[0][0].author).toBe('Will Hunting')
    expect(createBlog.mock.calls[0][0].url).toBe('www.apples.net')
    expect(createBlog.mock.calls[0][0].likes).toBe('314')
  })
})