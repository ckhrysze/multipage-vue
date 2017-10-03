<template>
  <div>
    <site-header />
    <h3>This is the Index!</h3>
    <site-footer />
  </div>
</template>

<script>
import SiteHeader from 'components/site_header'
import SiteFooter from 'components/site_footer'

export default {
  name: 'Index',
  components: {
    'site-header': SiteHeader,
    'site-footer': SiteFooter
  },
  data () {
    return {
    }
  }
}
</script>

