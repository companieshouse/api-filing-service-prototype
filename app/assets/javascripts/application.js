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
    var subNavActiveClass = 'app-mobile-nav__subnav--active'
    var subNavTogglerActiveClass = 'app-mobile-nav__subnav-toggler--active'
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
})

$(function () {
  $('nav a[href^="' + location.pathname.split('/')[1] + '"]').addClass('active')
})
