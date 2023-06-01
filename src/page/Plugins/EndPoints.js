// endpoints.js

import { getData } from "./StorageUtils";

// Les requetes PUT avec localhost ne fonctionnent pas, il faut utiliser l'adresse IP de la machine donc 0.0.0.0

export const API_BASE_URL = getData();

//export const API_BASE_URL = 'https://shrouded-ocean-76988.herokuapp.com/api/v1';
