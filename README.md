
# Files-To-Json
Upload X amounts of files of various types -> generate a thumbnail of the file -> Store the file to AWS -> generate JSON containing links and titles for 'HTML card style layouts'

Initially I created this because I found myself repeatedly manually creating extensive JSONs for a particular 'card generation' style page. It began as a single page html using only inline vanilla js. Once it became a bit unreadable/unmanageable I switched it over to react. After awhile I decided to turn it into more of a learning experience and implemented redux for the state management, AWS for serving, and I began to dabble with firebase for data persistence. 

If you try to clone/run it won't work because you need to plug in you're own AWS credentials and need authorization for the preview generator among other things.<br />


This ended up being a really fun experience because it was my first work through with relying completely on functional components and hooks.
