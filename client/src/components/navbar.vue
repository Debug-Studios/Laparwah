<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="item.heading"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click=""
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="" :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="blue darken-3"
      dark
      app
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Laparwah</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn 
      icon
      @click.stop="dialog = !dialog">
        <v-icon>account_circle</v-icon>
      </v-btn>
      
      
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          
        </v-layout>
      </v-container>
    </v-content>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop=""
    >
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
     <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Sign in
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                v-model="email"
                prepend-icon="mail"
                label="E-mail"
                :error-messages="errors.collect('email')"
                v-validate="'required|email'"
                data-vv-name="email"
                required                
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="password"
                prepend-icon="lock"
                label="Password"
                :type="'password'"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <span >Or Sign in using</span>
              
              <v-btn
              fab
              color="pink">
                <v-icon>google</v-icon>
              </v-btn>
              
              <v-btn
              fab
              color="pink">
                <v-icon>google</v-icon>
              </v-btn>
              <v-btn
              fab
              color="pink">
                <v-icon>google</v-icon>
              </v-btn>
            </v-flex>
            
            
          </v-layout>
        </v-container>
        <v-card-actions>
          
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="submit">Sign in</v-btn>
        </v-card-actions>
      </v-card>
</v-dialog>
    
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'District Blocks',
          model: false,
          children: [
            { text: 'Dasoli' },
            { text: 'Deval' },
            { text: 'Gairsain' },
            { text: 'Ghaat' },
            { text: 'Joshimath' },
            { text: 'Karanprayag' },
            { text: 'Narayanbagar' },
            { text: 'Pokhari' },
            { text: 'Tharali' }
          ]
        }
      ]
    }),
    props: {
      source: String
    },
    methods:{
      submit() {
        this.$validator.validateAll()
      }
    }
  }
</script>