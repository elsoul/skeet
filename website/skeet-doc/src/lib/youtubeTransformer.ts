const youtubeTransformer = {
  name: 'YouTube',
  shouldTransform(url: string) {
    return (
      /https?:\/\/(www\.)?youtube\.com\/watch\?v=/.test(url) ||
      /https?:\/\/youtu\.be\//.test(url)
    )
  },
  getHTML(url: string) {
    let videoId: string | null = ''

    if (/https?:\/\/(www\.)?youtube\.com\/watch\?v=/.test(url)) {
      videoId = new URL(url).searchParams.get('v')
    } else if (/https?:\/\/youtu\.be\//.test(url)) {
      videoId = url.split('youtu.be/')[1]
    }

    if (!videoId) {
      return ''
    }

    return `
      <div class="video-wrapper">
        <iframe
          src="https://www.youtube.com/embed/${videoId}"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    `
  },
}

export default youtubeTransformer
