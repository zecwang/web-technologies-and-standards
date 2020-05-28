<style type="text/css">
    ol { list-style-type: upper-alpha; }
</style>

1. Remix the react project from [Glitch: create-react-app-sample](https://glitch.com/~create-react-app-sample)
2. Remove the *public* and *src* folders in the remixed project
3. Add your *public* and *src* folders to a zip file
4. Upload the zip file to *assets*
5. Open Glitch console (Tools > Full Page Console), and type in following commands
6. `$ wget -O file.zip **https://url-to-your-zip**`
7. `$ unzip file.zip`
8. `$ rm file.zip`
9. `$ refresh`
10. Add dependencies to *package.json*

Then, you can check if it works.