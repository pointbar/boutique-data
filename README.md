# Dépôt exemple pour brutdethe/shop

Ce dépôt contient les données minimales pour alimenter la boutique proposée par Brut de Thé : https://github.com/brutdethe/shop/tree/main

## Petite visite

### le fichier des produits en vente

- [_produits.json_](./produits.json)

Ce fichier contient les données relatives aux produits présents.

Chaque produit peut contenir les informations suivantes :

- **id** : un identifiant unique pour ne pas confondre les produits
- **titre** : un titre en anglais et en français
- **modification** : une date de modification manuelle
- **création** : une date de création manuelle
- **catégorie** : une catégorie
- **description** : une description
- **prix** : un prix en euros
- **poids** : un poids en kg
- **quantité_produite** : la quantité produite, le calcul du stock se fait en soustrayant les ventes à cette valeur
- **photos** : un liste de photos
