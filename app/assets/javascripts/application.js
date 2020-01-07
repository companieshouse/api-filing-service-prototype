/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
  $('.js-app-mobile-nav-toggler').click(function ($module) {
    var navActiveClass = 'app-mobile-nav--active'
    var navTogglerActiveClass = 'app-header-mobile-nav-toggler--active'

    this.$module = $module || document
    this.$nav = document.querySelector('.js-app-mobile-nav')
    this.$navToggler = document.querySelector('.js-app-mobile-nav-toggler')
    var $nav = this.$nav
    var $navToggler = this.$navToggler

    if ($nav.classList.contains(navActiveClass)) {
      $nav.classList.remove(navActiveClass)
      $nav.setAttribute('aria-hidden', 'true')

      $navToggler.classList.remove(navTogglerActiveClass)
      $navToggler.setAttribute('aria-expanded', 'false')
    } else {
      $nav.classList.add(navActiveClass)
      $nav.setAttribute('aria-hidden', 'false')

      $navToggler.setAttribute('aria-expanded', 'true')
      $navToggler.classList.add(navTogglerActiveClass)
    }
  })
  $('.js-mobile-nav-subnav-toggler').click(function (event) {
    var $toggler = event.target
    var subNavActiveClass = 'app-mobile-nav__subnav--active'
    var subNavTogglerActiveClass = 'app-mobile-nav__subnav-toggler--active'
    if (!$toggler.classList.contains('js-mobile-nav-subnav-toggler')) {
      return
    }
    var $togglerLinkArea = $toggler.parentNode
    var $nextSubNav = $togglerLinkArea.parentNode.querySelector('.js-app-mobile-nav-subnav')
    if ($nextSubNav) {
      if ($nextSubNav.classList.contains(subNavActiveClass)) {
        $nextSubNav.classList.remove(subNavActiveClass)
        $togglerLinkArea.classList.remove(subNavTogglerActiveClass)

        $nextSubNav.setAttribute('aria-hidden', 'true')
        $toggler.setAttribute('aria-expanded', 'false')
      } else {
        $nextSubNav.classList.add(subNavActiveClass)
        $togglerLinkArea.classList.add(subNavTogglerActiveClass)
        $nextSubNav.setAttribute('aria-hidden', 'false')
        $toggler.setAttribute('aria-expanded', 'true')
      }
      event.preventDefault()
    }
  })
})
