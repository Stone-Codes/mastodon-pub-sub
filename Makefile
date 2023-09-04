rabbit-shell:
	docker exec -it rabbitmq bash

rabbit-users:
	docker exec -it rabbitmq bash -c 'rabbitmqctl add_user publisher publisher ; rabbitmqctl set_permissions -p / "publisher" "mastodon.*" "mastodon.*" ""'
	docker exec -it rabbitmq bash -c 'rabbitmqctl add_user sub1 sub1 ; rabbitmqctl set_permissions -p / "sub1" "(mastodon|sub1).*" "sub1.*" "(mastodon|sub1).*"'
	docker exec -it rabbitmq bash -c 'rabbitmqctl add_user sub2 sub2 ; rabbitmqctl set_permissions -p / "sub2" "(mastodon|sub2).*" "sub2.*" "(mastodon|sub2).*"'
