# restapi-pokemon

This pokemon API has the purpose of give some useful hints like if a pokemon have some fight advantage over the other.
In addition, given a list of pokemon names, the user can have a list of the moves that those pokemons share. This APi is
especially useful for those people which are developing a pokemon based game and are interested in provide useful hint before battle.

## Pokemon Advantage Endpoint
```
https://restapi-pokemon.herokuapp.com/api/v1/pokemon-advantage/charizard/bulbasaur
```
This endpoint must receive two pokemon names as per the example (charizard and bulbasaur), and the API will return an object with two
boolean values:
```json
{
  "double_damage_to": true,
  "half_damage_from": true
}
```
Which in this case means that charizard can deal double damage to bulbasaur, and also charizard receive just the half of the damage from bulbasaur
since both flags are true.

## Pokemon Moves Endpoint
```
https://restapi-pokemon.herokuapp.com/api/v1/pokemon-moves/en/charizard&pikachu&bulbasaur/5
```
This endpoint must receive three parameters:
1. The language, in this example we're using /en for English but we support the following languages: ja-Hrkt, roomaji, ko, zh-Hant, fr, de, es, it,
en, cs, ja, zh-Hans, pt-BR.

2. A list of pokemon names delimited by the & character, in this example we're using /charizard&pikachu&bulbasaur (charizard, pikachu and bulbasaur).

3. A limit of moves to display, in this case just /5 common moves will be displayed.

As result of your request you will receive an array with the information based on the previously explained parameters.

```json
[
"Take Down",
"Body Slam",
"Growl",
"Double-Edge",
"Headbutt"
]
```

## Docker
For developers with a docker environment:
```
docker pull dannyvc95/restapi-pokemon:latest
```
This command will pull from docker hub the latest version of the API.

## Kubernetes
If you have a local environment of kubernetes, you can clone this repo and use minikube to apply the yaml file configurations to create a deployment and a service
to run this API.
```
git clone https://github.com/dannyvc95/restapi-pokemon.git
```
```
kubectl apply -f restapi-pokemon-kubernetes.yaml
```

If you're facing a problem with this API, please don't hesitate to open an issue.
