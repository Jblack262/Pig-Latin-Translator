//converts individual words into pig latin
var word = ""; //stores one word at a time to change it into pig latin
var words2 = [""]; //holds the final sentence as an array before it becomes one string
var ending = "ay"; //defaults to having the "ay" ending but can change to "yay" if the word starts with a vowel
var punctuationUsed = "";
var startsWithVowel = undefined;
function toPigLatin(input) {
    input = input.toLowerCase(); //turns everything to lower case so it can find vowels better
    word = input;
    splitWord(input); //function to split each word into individual elements in an array
    removePuctuation(word);//if the word has any puncuation at the end, then it removes it
    determineEnding(word);//determines if the word starts with a vowel so it knows what ending to use
    moveFirstLetters(word); //if the first letter is not a vowel, it moves them to the end
    addEnding(word); //if the first letter is a vowel it adds "yay" instead of just "ay"
    combine(word); //combines each element in the array into one word
}

function splitWord(input) { //splits the string into individual characters
    word = input.split('');
}

function moveFirstLetters(input) { //moves the beginning letters to the end
    if (input[0] == "a" || input[0] == "e" || input[0] == "i" || input[0] == "o" || input[0] == "u") { //if the word starts with a vowel this add "yay" instead of "ay"
        startsWithVowel = true;
    } else {
        startsWithVowel = false;
    }
    var temp = [];
    for (let i = 0; i < input.length; i++) { //copies every letter before it hits a vowel
        if (input[i] == "a" || input[i] == "e" || input[i] == "i" || input[i] == "o" || input[i] == "u") { //looks at each letter until it finds a vowel, then it stop
            break;
        } else { //stores each letter prior to a vowel in a temporary array
            temp.push(input[i]);
        }
    }
    for (let i = 0; i < temp.length; i ++) { //removes the consonants from the beginning and adds them to the end
        word.shift();
        word.push(temp[i]);
    }
}

function determineEnding(input) { //figure out what suffix is going to be used
    if (input[0] == "a" || input[0] == "e" || input[0] == "i" || input[0] == "o" || input[0] == "u") { //if the word starts with a vowel this use "yay" instead of "ay"
        ending = "yay";
    }
}

function removePuctuation(input) { //removes any punctuation so the translator works  properly
    if (input[input.length - 1] == ".") {
        input[input.length - 1] = "";
        word = input;
        punctuationUsed = "."; //if there is a period at the end then it records it to then re-add it later
    } else if (input[input.length - 1] == "!") {
        input[input.length - 1] = "";
        word = input;
        punctuationUsed = "!"; //if there is an exclamation point at the end then it records it so it knows to re-add it later
    } else if (input[input.length - 1] == "?") {
        input[input.length - 1] = "";
        word = input;
        punctuationUsed = "?"; //if there is a quesiton mark at the end then it records it so it knows to re-add it later
    }
}

function combine(input) { //after translating to pig latin, it takes the individual elements of the array and turns it into a single element
    var temp = [""];
    for (let i = 0; i <= word.length - 1; i ++) {//adds each element to the first position 
        temp[0] += word[i];
    }
    word = temp; //saves the finished word
    words2.push(word);
}

function addEnding(input) {
    if (startsWithVowel == true) { //if the word starts with a vowel this add "yay" instead of "ay"
        word.push("yay");
    } else { //otherwise it adds the normal "ay" to the end
        word.push("ay");
    }
}



//convets sentences into individual words for the function toPigLatin()
var words = [""];
function translateSentenceToPigLatin(input) { //MAIN FUNCTION TO TRANSLATE --> USE THIS ONE <--
    word = ""; //resets the variable to you can use this function more than once
    words2 = [""];
    words = [""];


    input = input.toLowerCase(); //makes sure everything is lowercase
    input = input.split(' ');//splits the array by word
    words = input;//saves each word to an array
    translateEachWord(words);//translate the words individually
    makeFinalSentence(words2);//save the individual words into a single sentence

    console.log(words2);
}

function translateEachWord(input) { //plugs each of the words from the sentence into the function toPigLatin()
    for (let i = 0; i < words.length; i ++) {
        toPigLatin(words[i]);//plugs each word of the sentence into the translator and saves them individually
    }
}

function makeFinalSentence(input) {
    var temp = [""]; 
    for (let i = 1; i < input.length; i++) {
        if (i == input.length - 1) {
            temp[0] += words2[i] + punctuationUsed; //if its the last word in the sentence it adds a period
        } else {
            temp[0] += words2[i] + " "; //if its the first word or middle words it adds a space
        }
    }
    words2 = temp;
}

//testing the translator
translateSentenceToPigLatin("How was your day?");
translateSentenceToPigLatin("Happy birthday to you!");
translateSentenceToPigLatin("This was an interesting assignment.");