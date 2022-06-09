export const screenSize = {
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
      isDesktop: false,
      isTablet: false,
      isPhone: false,
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight

      this.isDesktop = this.window.width >= 1200
      this.isTablet = this.window.width > 736 && this.window.width < 1200
      this.isPhone = !this.isDesktop && !this.isTablet
    },
  },
}
