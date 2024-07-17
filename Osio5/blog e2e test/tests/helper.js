const loginWith = async (page, username, password) => {
  await page.getByPlaceholder('usernameInput').fill(username)
  await page.getByPlaceholder('passwordInput').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const addBlog = async (page, title, auth, url) => {
  await page.getByRole('button', { name: 'Add Blog' }).click()
  await page.getByPlaceholder('typeTitle').fill(title)
  await page.getByPlaceholder('typeAuthor').fill(auth)
  await page.getByPlaceholder('typeUrl').fill(url)
  await page.getByRole('button', { name: 'Add Blog' }).click()
}

const logOut = async (page) => {
  await page.getByRole('button', { name: 'Log out' }).click()
}

const likeSpam = async (page, title, likeCount) => {
  const blogElement = page.locator(`text=${title}`).locator('..')
  await blogElement.locator('button[data-testid="view-click"]').click()
  for (let i = 0; i < likeCount; i++) {
    await blogElement.locator('button[data-testid="like-click"]').click()
  }

  await blogElement.locator('button[data-testid="hide-click"]').click()
}

export { loginWith, addBlog, logOut, likeSpam }
