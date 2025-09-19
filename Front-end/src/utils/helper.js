export const validateEmail = (email) =>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const getInitials = (name) =>{
    if (!name) return "";

    const word=name.split("");
    let intitals="";

    for(let i=0; i< Math.min(words.length,2);i++){
        intitals +=words[i][0];
    }

    return intitals.toUpperCase();
};

export const addThousandsSeparator = (num) =>{
    if(num == null || isNaN(num)) return "";

    const [integerPart,fractionalPart] =num.toString().split(".");
    const formattedInteger =integerPart.replace(/\B(?=(\d{3})+(?!\d))/g,",");

    return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    :formattedInteger;
};