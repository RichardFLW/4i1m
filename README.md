Rapport sur le fonctionnement et la mécanique globale de l'application
1. Arrivée de l'utilisateur sur la page de sélection de la langue

Page d'accueil :
Lorsqu'un utilisateur arrive sur la page d'accueil, il est redirigé automatiquement vers la page de sélection de la langue (cette partie peut être implémentée ou non selon les besoins).
Page de sélection de la langue :
L'utilisateur arrive sur la page de sélection de la langue (/select-language).
Sur cette page, l'utilisateur voit un titre et deux boutons : un pour choisir "Anglais" et un pour choisir "Français".
Lorsqu'un utilisateur clique sur l'un des boutons, la fonction handleLanguageSelect est appelée avec le paramètre de langue approprié ("en" ou "fr").
La fonction utilise router.push de Next.js pour naviguer vers la page du jeu (/jeu), en passant la langue sélectionnée comme paramètre de requête dans l'URL (/jeu?lang=en ou /jeu?lang=fr).
2. Arrivée de l'utilisateur sur la page du jeu

Page du jeu :
La page du jeu (/jeu) utilise le hook useSearchParams de Next.js pour obtenir le paramètre de langue de l'URL.
La langue sélectionnée est passée en tant que prop au composant PexelsImages.
3. Fonctionnement du composant PexelsImages

Initialisation :

Le composant PexelsImages initialise plusieurs états pour gérer les images, l'index actuel du mot, la requête de recherche, les valeurs d'entrée, le succès de la soumission, le chargement, l'affichage de la modal et le message de la modal.
useRef est utilisé pour stocker les images préchargées.
Chargement des images :

useEffect est utilisé pour charger les images chaque fois que la requête de recherche (searchQuery) ou l'index actuel (currentIndex) change.
Une requête HTTP est envoyée à l'API de Pexels pour récupérer les images correspondant au mot actuel en anglais (les images sont toujours recherchées en anglais pour garantir la pertinence).
Préchargement des images :

Une deuxième requête est envoyée pour précharger les images du prochain mot, ce qui améliore les performances et l'expérience utilisateur.
4. Interaction utilisateur avec le jeu

Affichage des images et des entrées :

Les images récupérées sont affichées à l'utilisateur.
Un champ de saisie et un clavier virtuel (VirtualKeyboard) sont rendus pour permettre à l'utilisateur de deviner le mot.
Utilisation du clavier virtuel :

Le clavier virtuel permet à l'utilisateur d'entrer des lettres, de supprimer des lettres (BACKSPACE) et de soumettre sa réponse (SUBMIT).
Les touches du clavier sont générées de manière à inclure les lettres du mot correct ainsi que des lettres aléatoires.
Validation de la réponse :

Lorsque l'utilisateur soumet sa réponse, handleSubmit vérifie si la réponse est correcte.
Si la réponse est correcte, un message de succès est affiché dans une modal (ResultModal), sinon un message d'erreur est affiché.
Fermeture de la modal de résultat :

Lorsque l'utilisateur ferme la modal, l'état du jeu est mis à jour pour passer au mot suivant si la réponse était correcte.
Les images pour le prochain mot sont chargées (soit à partir des images préchargées, soit en envoyant une nouvelle requête à l'API de Pexels).
Conclusion
L'application utilise des composants et des hooks de React et Next.js pour gérer l'état, les effets et la navigation. Elle intègre l'API de Pexels pour récupérer des images pertinentes pour les mots à deviner. L'utilisateur interagit avec le jeu en sélectionnant une langue, en visualisant les images, en utilisant le clavier virtuel pour entrer sa réponse et en recevant des feedbacks immédiats sur la validité de sa réponse. Le processus est conçu pour être fluide et interactif, offrant une expérience utilisateur engageante.