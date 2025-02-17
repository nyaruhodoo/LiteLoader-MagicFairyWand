import { slug } from '@/manifest'
import styleUrl from './index.scss?url'
import fontUrl from './font.scss?url'
import videoBase64 from '../../../assets/movie.mp4'

class ConfigElement extends HTMLElement {
  async connectedCallback() {
    const liteloader = document.querySelector('.setting-main') as HTMLDivElement
    liteloader.style.backgroundColor = 'black'

    // font
    const fontEl = document.createElement('link')
    fontEl.rel = 'stylesheet'
    fontEl.href = fontUrl
    document.head.append(fontEl)

    const shadow = this.attachShadow({ mode: 'open' })

    // CSS
    const linkEl = document.createElement('link')
    linkEl.rel = 'stylesheet'
    linkEl.href = styleUrl
    shadow.append(linkEl)

    linkEl.addEventListener('load', () => {
      const video = document.createElement('video')
      // video.src = `${LiteLoader.plugins[slug].path.plugin}/assets/movie.mp4`
      video.src = videoBase64
      video.loop = true
      video.volume = 0.05
      const p = document.createElement('p')
      p.innerHTML = `星の力を秘めしかぎよ、真の姿を我の前に示せ、けいやくのもとさくらが命じる、レリーズ！`

      shadow.append(video, p)

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play()
            const liteloader = document.querySelector('.setting-main') as HTMLDivElement
            liteloader.style.backgroundColor = 'black'
            const titlebar = document.querySelector('.setting-title') as HTMLDivElement
            titlebar.style.visibility = 'hidden'
          } else {
            video.pause()
            const liteloader = document.querySelector('.setting-main') as HTMLDivElement
            liteloader.style.removeProperty('background-color')
            const titlebar = document.querySelector('.setting-title') as HTMLDivElement
            titlebar.style.removeProperty('visibility')
          }
        })
      })
      observer.observe(video)
    })
  }
}
customElements.define(slug, ConfigElement)

export const onSettingWindowCreated = (view: HTMLElement) => {
  view.innerHTML = `<${slug}></${slug}>`
}
