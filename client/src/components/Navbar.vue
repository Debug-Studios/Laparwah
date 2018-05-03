<template lang="pug">
  v-toolbar(dark)
    v-toolbar-title.subheading.ml-0.pl-3.hidden-sm-and-down Breaking News:
    transition(name="slide-fade" mode="out-in")
      router-link(:to="'/news/' + breakingNews[breakingNewsIndex].url" :key="breakingNewsIndex" v-if="breakingNews.length").breaking-news-link.subheading.ml-0.pl-3 {{breakingNews[breakingNewsIndex].title}}

    v-spacer

    v-toolbar-items.hidden-sm-and-down
      .d-flex.pr-4.flex-weather
        v-icon.pr-2 cloud
        .subheading.pr-2 {{temp}}&deg;C
        .subheading (Dehradun)
        .subheading.pl-1 by
        img.pl-1(src="https://icons.wxug.com/logos/PNG/wundergroundLogo_4c_rev_horz.png" height="24px")

      .d-flex(v-for="stock in stocks")
        transition(name="slide-fade" mode="out-in")
          .flex-center(:key="stock.change")
            .px-4.flex-stock(v-if="stock.change > 0")
              a.plain.span.d-flex(:href="stock.url" target="_blank")
                .body-2 {{stock.name}}
                v-icon.green--text keyboard_arrow_up
              span.headline.green--text {{stock.change}}
            .px-4.flex-stock(v-if="stock.change < 0")
              a.plain.span.d-flex(:href="stock.url" target="_blank")
                .body-2 {{stock.name}}
                v-icon.red--text keyboard_arrow_down
              span.headline.red--text {{stock.change}}

    v-menu(offset-y v-if='isLogged && user' dark)
      v-btn(icon slot='activator')
        v-avatar(size='32')
          v-gravatar(v-bind:email='user.email')
      v-card
        v-list
          v-list-tile(avatar).pr-4
            v-list-tile-avatar
              v-gravatar(:email="user.email" :size="64")
            v-list-tile-content
              v-list-tile-title {{user.name}}
              v-list-tile-sub-title(v-if="user.designation") {{user.designation}}
        v-divider
        v-list
          v-list-tile(@click="toDashboard")
            v-list-tile-action
              v-icon account_box
            v-list-tile-title My Dashboard
          v-list-tile(@click="logout")
            v-list-tile-action
              v-icon(color="red") exit_to_app
            v-list-tile-title Sign out

    v-menu(offset-y v-else dark)
      v-btn.pa-0.ma-0(flat slot='activator') SIGN IN
      v-card
        v-flex.text-xs-center(xs12).pt-2
          span SIGN IN USING
        v-flex.text-xs-center(xs12 )
          a(href='/auth/google')
            v-avatar(size='32')
              img(src='/icons/google.svg')
          a(href='/auth/facebook')
            v-avatar(size='32')
              img(src='/icons/facebook.svg')
          a(href='/auth/twitter')
            v-avatar(size='32')
              img(src='/icons/twitter.svg')
          a(href='/auth/microsoft')
            v-avatar(size='32')
              img(src='/icons/windows.svg')


</template>

<script>
import truncate from "lodash.truncate";
export default {
  name: "navbar",
  data: () => ({
    user: "",
    dialog: false,
    isLogged: false,
    breakingNews: [],
    breakingNewsIndex: 0,
    user: {},
    socials: [
      { icon: "/icons/google.svg" },
      { icon: "/icons/facebook.svg" },
      { icon: "/icons/twitter.svg" },
      { icon: "/icons/windows.svg" }
    ],
    stocks: [{}, {}],
    temp: ""
  }),
  props: {
    source: String
  },
  created() {
    this.axios.get("/accounts/getCurrentUser").then(response => {
      this.isLogged = response.data.isLoggedin === "true";
      if (response.data.user) {
        this.user = response.data.user;
      }
    });
  },
  methods: {
    stockUpdater: function() {
      this.axios.get("/stocks/getNSE").then(response => {
        this.$set(this.stocks, 0, response.data.data[1]);
      });

      this.axios.get("/stocks/getSENSEX").then(response => {
        this.$set(this.stocks, 1, response.data);
      });
    },

    getBreakingNews: function() {
      this.axios.get("/news/getBreaking/3").then(response => {
        this.breakingNews = response.data;
        this.breakingNews.forEach(news => {
          news.title = truncate(news.title, { length: 80 });
        });
      });
    },

    toDashboard() {
      window.location.href = `${window.location.origin}/dashboard`;
    },

    logout() {
      window.location.href = `${window.location.origin}/auth/logout`;
    }
  },
  mounted() {
    this.stockUpdater();
    this.getBreakingNews();

    setInterval(() => {
      this.stockUpdater();
    }, 40000);

    // Breaking News ticker updater
    setInterval(() => {
      if (this.breakingNewsIndex < this.breakingNews.length - 1) {
        this.breakingNewsIndex++;
      } else {
        this.breakingNewsIndex = 0;
      }
    }, 10000);

    // Show weather report
    this.axios.get("/weather/getCurrentWeather").then(response => {
      this.temp = response.data.hourly_forecast[0].temp.metric;
    });
  }
};
</script>

<style scoped>
.avatar {
  margin: 15px;
}

a.plain {
  text-decoration: none;
  color: white;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-stock {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.flex-weather {
  display: flex;
  justify-content: center;
  align-items: center;
}

.breaking-news-link {
  text-decoration: none;
  color: inherit;
}

/* Transitions */
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 300ms ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
