document.addEventListener('DOMContentLoaded', () => {
    // Sélectionne tous les éléments <details> à l'intérieur de .faq-accordion
    const faqDetails = document.querySelectorAll('.faq-accordion details');

    faqDetails.forEach(details => {
        // Ajoute un écouteur d'événements 'toggle' à chaque <details>
        details.addEventListener('toggle', () => {
            // Si cet élément <details> vient d'être ouvert
            if (details.open) {
                // Parcourt tous les autres éléments <details>
                faqDetails.forEach(otherDetails => {
                    // Si un autre élément <details> est ouvert ET n'est PAS l'élément actuel
                    if (otherDetails !== details && otherDetails.open) {
                        // Ferme cet autre élément <details>
                        otherDetails.open = false;
                    }
                });
            }
        });
    });
});