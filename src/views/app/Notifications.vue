<template>
  <v-container fluid grid-list-xl fill-height>
    <v-layout>
      <v-col xs12>
        <v-card color="green">
          <template #header>
            <div>
              <div class="title font-weight-light mb-2">Notifications</div>
              <div class="category">
                Handcrafted by us with
                <v-icon size="17"> mdi-heart </v-icon>
              </div>
            </div>
          </template>

          <v-card-text>
            <v-layout row wrap>
              <v-col md6 sm12>
                <h2 class="title font-weight-light mb-3">
                  Notifications Style
                </h2>

                <gen-notification class="mb-3" color="info">
                  This is a plain notification
                </gen-notification>
                <gen-notification class="mb-3" color="info" dismissible>
                  This is a notification with close button.
                </gen-notification>
                <gen-notification
                  class="mb-3"
                  color="info"
                  dismissible
                  icon="mdi-bell-plus"
                >
                  This is a notification with close button and icon.
                </gen-notification>
                <gen-notification
                  class="mb-3"
                  color="info"
                  dismissible
                  icon="mdi-bell-plus"
                >
                  This is a notification with close button and icon and have
                  many lines. You can see that the icon and the close button are
                  always vertically aligned. This is a beautiful notification.
                  So you don't have to worry about the style.
                </gen-notification>
              </v-col>

              <v-col md6 sm12>
                <h2 class="title font-weight-light">Notifcation States</h2>

                <gen-notification class="mb-3" color="info" dismissible>
                  <strong>INFO</strong> - This is a regular notification made
                  with `color="info"`
                </gen-notification>

                <gen-notification class="mb-3" color="success" dismissible>
                  <strong>SUCCESS</strong> - This is a regular notification made
                  with `color="success"`
                </gen-notification>

                <gen-notification class="mb-3" color="warning" dismissible>
                  <strong>WARNING</strong> - This is a regular notification made
                  with `color="warning"`
                </gen-notification>

                <gen-notification class="mb-3" color="error" dismissible>
                  <strong>DANGER</strong> - This is a regular notification made
                  with `color="error"`
                </gen-notification>

                <gen-notification class="mb-3" color="purple" dismissible>
                  <strong>PRIMARY</strong> - This is a regular notification made
                  with `color="purple"`
                </gen-notification>
              </v-col>
            </v-layout>
            <div class="text-xs-center">
              <h2 class="title font-weight-light mb-2">Notification Places</h2>
              <span class="subheading font-weight-light grey--text"
                >Click to view notifications</span
              >
            </div>

            <v-container grid-list-lg>
              <v-layout justify-center row wrap>
                <v-col xs12 sm4>
                  <v-btn block color="success" @click="snack('top', 'left')">
                    Top Left
                  </v-btn>
                </v-col>
                <v-col xs12 sm4>
                  <v-btn block color="success" @click="snack('top')">
                    Top Center
                  </v-btn>
                </v-col>
              </v-layout>
              <v-layout justify-center row wrap>
                <v-col xs12 sm4>
                  <v-btn block color="success" @click="snack('top', 'right')">
                    Top Right
                  </v-btn>
                </v-col>
                <v-col xs12 sm4>
                  <v-btn block color="success" @click="snack('bottom', 'left')">
                    Bottom Left
                  </v-btn>
                </v-col>
              </v-layout>
              <v-layout justify-center row wrap>
                <v-col xs12 sm4>
                  <v-btn block color="success" @click="snack('bottom')">
                    Bottom Center
                  </v-btn>
                </v-col>
                <v-col xs12 sm4>
                  <v-btn
                    block
                    color="success"
                    @click="snack('bottom', 'right')"
                  >
                    Bottom Right
                  </v-btn>
                </v-col>
              </v-layout>
            </v-container>

            <v-snackbar
              v-model="snackbar"
              :color="color"
              :bottom="bottom"
              :top="top"
              :left="left"
              :right="right"
              dark
            >
              <v-icon color="white" class="mr-3"> mdi-bell-plus </v-icon>
              <div>
                Welcome to <b>Vue Material Dashboard</b> - a beautiful freebie
                for every web developer.
              </div>
              <v-icon size="16" @click="snackbar = false">
                mdi-close-circle
              </v-icon>
            </v-snackbar>
          </v-card-text>
        </v-card>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    color: null,
    colors: ["purple", "info", "success", "warning", "error"],
    top: true,
    bottom: false,
    left: false,
    right: false,
    snackbar: false,
  }),

  methods: {
    snack(...args) {
      this.top = false;
      this.bottom = false;
      this.left = false;
      this.right = false;

      for (const loc of args) {
        this[loc] = true;
      }

      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];

      this.snackbar = true;
    },
  },
};
</script>
