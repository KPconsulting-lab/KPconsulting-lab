*******************************
// violence basée sur le genre en Afrique 
********************************
clear

import excel "C:\Users\Lenovo\Downloads\Variable_interet.xlsx", sheet("viariable_interet") firstrow 

****************************************************
****************************************************
// indicateur de pauvrete

/*/ standardisation des variable
foreach v of varlist manque_revenu manque_combustible manque_soins_medicaux manque_eau_potable manque_nourriture {
	egen `v'_std = std(`v')
replace `v' = (`v' - mean(`v')) / `v'_std
egen `v'_std = std(`v')
replace `v' = (`v' - mean(`v')) / `v'_std
}

*/
pca manque_revenu manque_combustible manque_soins_medicaux manque_eau_potable manque_nourriture, components(1)

*tempfile pauvret
predict pauvret
sum pauvret
gen pauvrete=100*((pauvret-r(min))/(r(max)-r(min)))
label var pauvrete "Pauvrete multi_dimensionnelle"

// utilisation des reseaux sociaux 

label var Info_par_reseau_sociaux "utilisation des reseaux sociaux"

// utilisation des media traditionnel 
// utilisation de l'analyse des composante multiple (PCA)

pca Info_par_presse Info_par_television Info_par_radio, components(1)
predict media
sum media
gen media_traditionnel=100*((media-r(min))/(r(max)-r(min)))
label var media_traditionnel "Utilisation des medias traditionnels"

// Utilsation  des TIC 
rename (possède_personnellement_telephon possède_personnellement_ordinat Possède_personnellement_televisi Possède_personnellement_Radio)(telephone ordinateur television radio)

pca ordinateur television radio telephone, components(1)

predict tic 
sum tic 
gen TIC=100*((tic-r(sum))/(r(max)-r(min)))
label var TIC "utilisation des nouvelles technologie de la communication et de l'information"

rename (Freqence_reguliere_violence_femm violence_faite_femme)(fre_violence violence_femme)

label var fre_violence "la fréquence régulière de la violence faite aux femmes "

label var violence_femme "Justifié pour l'homme d'utiliser la discipline physique sur la femme"

label var violence_affaire_privee " considération de la violence comme une affaire privee"
label var violence_affaire_criminelle  " considération de la violence comme une affaire criminelle"
label var signalement_violence_harcelee "Femmes qui signalent la violence sexiste : critiquées ou harcelées"
label var prise_au_serieux_violence_police "Femmes qui signalent la violence sexiste : prises au sérieux par la police"
label  var effort_gov_egalite_femme "gouvernement fait plus ou moins pour les droits et l'égalité des femmes"

label var egalite_terre "Egalité de chances égales de posséder ou d'hériter de terres"
label var egalite_emploi "Egalité de chances de posseder un emploi"

keep Pays Region Presence_Socialgovtcenteroffi Presence_Banquemicrofinance Présence_marché Présence_centre_sante Presence_Poste_policegendarmeri Presence_Ecole possède_personnellement_compte_b condition_vie_act au_chomage niveau_education travailleur_temps_plein Inégalitédaccèsàléducation Inégalitédeschancesourémunér Troppeudefemmesoccupentdes Droitsinégauxenmatièredepro Violencefondéesurlegenre effort_gov_egalite_femme egalite_terre egalite_emploi violence_affaire_privee violence_affaire_criminelle signalement_violence_harcelee prise_au_serieux_violence_police fre_violence violence_femme pauvrete media_traditionnel TIC

save "C:\Users\Lenovo\Downloads\Afro\Violence_femmes_V_reduit.dta", replace 






