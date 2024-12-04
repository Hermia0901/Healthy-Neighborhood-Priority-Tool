document.getElementById('calculate-btn').addEventListener('click', function () {
    // Get the input values
    const age = parseFloat(document.getElementById('age').value);
    const genderValue = document.getElementById('gender').value;
    const maritalStatusValue = document.getElementById('marital-status').value;
    const financialStrainValue = document.getElementById('financial-strain').value;
    const neighborhoodBelongingsValue = document.getElementById('neighborhood-belongings').value;
    const neighborhoodValue = document.getElementById('neighborhood').value;

    // Initialize coefficients
    let female = 0, transgender = 0, neverMarried = 0, nowMarried = 0;
    
    // Determine gender coefficients
    if (genderValue === 'female') {
        female = 1;
    } else if (genderValue === 'transgender') {
        transgender = 1;
    }

    // Determine marital status coefficients
    if (maritalStatusValue === 'never_married') {
        neverMarried = 1;
    } else if (maritalStatusValue === 'now_married') {
        nowMarried = 1;
    }

    // Map financial strain and neighborhood belongings to numbers
    const financialStrain = {
        'very_hard': 1,
        'somewhat_hard': 2,
        'easy': 3,
        'very_easy': 4,
        'dont_know': 0 // Assuming 0 if 'Don't know' is not part of the scoring
    }[financialStrainValue];

    const neighborhoodBelongings = {
        'strongly_disagree': 1,
        'disagree': 2,
        'agree': 3,
        'strongly_agree': 4,
        'dont_know': 0 // Assuming 0 if 'Don't know' is not part of the scoring
    }[neighborhoodBelongingsValue];

    // Neighborhood factors
    const neighborhoodFactors = {
        'Brockton': 0,
        'Chelsea': 0.112876364,
        'Dorchester': 0.047882346,
        'Everett': 0.135684175,
        'Fall River': -0.068107572,
        'Lynn': 0.134090895,
        'Mattapan': 0.068443872,
        'New Bedford': 0.014879852,
        'Roxbury': 0.094003027
    };

    const neighborhoodFactor = neighborhoodFactors[neighborhoodValue] || 0;

    // Calculate Happiness Score
    const happinessScore = 
        (1.83582255399656E-07 * age) + 
        (-0.096195461 * female) + 
        (-0.593993891905012 * transgender) + 
        (0.173106493759191 * neverMarried) + 
        (0.198614191274267 * nowMarried) + 
        (0.120410757915907 * financialStrain) + 
        (neighborhoodBelongings * neighborhoodFactor);

    // Display Happiness Score in the results section, rounded to two decimal places
    const happinessScoreElem = document.getElementById('happiness-score');
    happinessScoreElem.innerHTML = `Happiness Score: <span>${happinessScore.toFixed(2)}</span>`;
});
