deploy-app:
	'kubectl apply -f ./istio/app/deployment.yaml'
	'kubectl apply -f ./istio/app/service.yaml'

undeploy-app:
	'kubectl delete -f istio/app/deployment.yaml '
	'kubectl delete -f ./istio/app/service.yaml'