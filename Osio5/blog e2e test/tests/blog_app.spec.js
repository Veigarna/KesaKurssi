const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, addBlog, logOut, likeSpam } = require('./helper')
describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Root',
        username: 'root',
        password: 'root',
      },
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByPlaceholder('LoginForm')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Logged in successfully')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'virheellinen')
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    //5.19
    test('a new blog can be created', async ({ page }) => {
      await addBlog(page, 'Test', 'Author 1', 'http://blog1.com')
      await expect(page.getByPlaceholder('blogBox')).toBeVisible()
    })

    test('blog can be liked', async ({ page }) => {
      await addBlog(page, 'Test', 'Author 1', 'http://blog1.com')
      await expect(page.getByPlaceholder('blogBox')).toBeVisible()
      await page.getByTestId('view-click').click()

      const likesBefore = await page.getByTestId('blog-likes')
      console.log(likesBefore)
      await expect(likesBefore).toContainText('0')
      await page.getByTestId('like-click').click()
      const likesAfter = await page.getByTestId('blog-likes')
      await expect(likesAfter).toContainText('1')
    })

    //5.23
    test('ordered by likes', async ({ page }) => {
      //blogit
      await addBlog(page, 'Blog 1', 'Author 1', 'http://blog1.com')
      await addBlog(page, 'Blog 2', 'Author 1', 'http://blog2.com')
      await addBlog(page, 'Blog 3', 'Author 2', 'http://blog3.com')

      //liket
      await likeSpam(page, 'Blog 1', 5)
      await likeSpam(page, 'Blog 2', 10)
      await likeSpam(page, 'Blog 3', 3)

      const blogTitles = await page
        .locator('[data-testid="blog-title"]')
        .allInnerTexts()
      expect(blogTitles).toEqual(['Blog 2', 'Blog 1', 'Blog 3'])
    })
  })
  describe('Loggin in with many users', () => {
    test('blog can be removed by author', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await addBlog(page, 'Test', 'Author 1', 'http://blog1.com')

      await expect(page.getByPlaceholder('blogBox')).toBeVisible()
      await page.getByTestId('view-click').click()
      await expect(page.getByTestId('remove-click')).toBeVisible()

      page.on('dialog', (dialog) => {
        expect(dialog.type()).toBe('confirm')
        expect(dialog.message()).toBe(
          'Oletko varma, että haluat poistaa tämän?'
        )
        dialog.accept()
      })

      await page.getByTestId('remove-click').click()

      await page.waitForSelector('text=Test Blog', { state: 'detached' })

      await expect(page.getByPlaceholder('blogBox')).not.toBeVisible()
    })

    test('remove not possible if not author', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await addBlog(page, 'Test', 'Author 1', 'http://blog1.com')
      //oikee käyttäjä
      await expect(page.getByPlaceholder('blogBox')).toBeVisible()
      await page.getByTestId('view-click').click()
      await expect(page.getByTestId('remove-click')).toBeVisible()

      await logOut(page)
      //toinen käyttäjä
      await loginWith(page, 'root', 'root')

      await expect(page.getByPlaceholder('blogBox')).toBeVisible()
      await page.getByTestId('view-click').click()
      await expect(page.getByTestId('remove-click')).not.toBeVisible()
    })
  })
})
