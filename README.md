# Services
### publisher
The publisher is reponsible for

 - Receiving status updates posted on mastodon and publishing those to rabbitmq
 - Posting status updates received via and API

### subscriber
The subscriber is responsible for

 - Receiving messages from their specified queue and logging them

### publish-client
The publish-client is responsible for

 - Providing a small interface to utilize the API to post status updates from the publisher

# Run the stack

 1. Setup a account on [Mastodon](https://mastodon.social)
 2. Setup development application in Mastodon with read/write access 
 3. Copy the access token of the app and add it to `MASTODON_ACCESS_TOKEN` in `docker-compose.yml`
 4. Start the compose file
 5. Execute `make rabbit-users` to setup the required rabbitmq users
 6. Restart the compose file
 7. Done

# Idea behind the rabbitmq setup
With the rabbitmq setup, it is possible for the publisher service to send messages to all queues connected to a certain exchange. This allows subscriber services to create queues connected to that exchange, in order to receive messages, which also means there can be any amount of subscribers which all can create their own queue and receive the same messages published through that exchange. Topic exchange could also have been used, but i didnt see a need for that with the requriements given for the task.

The rabbitmq user setup allows to create a user for each subscriber and let that subscriber only get access to the service's queue, which should satisfy the subscriber based authentication constraint.

# Feature priority

 1. Setup rabbitmq with the publisher service to send out messages => This is going to be a central part of the application, and will need some time to investigate how the rabbitmq setup should be made.
 2. Setup the subscriber service to receive messages => Again a central part of the application and needs some investigation for the setup
 3. Setup the mastodon integration to stream messages and push them into rabbitmq => After having the rabbitmq setup, this feature should be done before posting a status to mastodon, as the streaming needs to happen in order to read statuses, and testing the basic flow with rabbitmq can already happen, as a status can also be posted via the mastodon website.
 4. Set up mastodon integration to post a status to mastodon => Next part left for the social media integration
 5. Set up rabbitmq users to restrict access => After the integration of all the core parts of the application, subscriber based authentication to receive the messages can be handled
 6. Set up API that should be posted to mastodon => Not part of the core application, so this features goes second last, to have an easy way to post a status to mastodon via the publisher service and fully utilize the mastodon integration
 7. Set up the react app to easily utilize the API => Last feature to develop, as the API could also be consumed in another way
