import { locale } from "./locale.js";

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition,
  SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList,
  // SpeechRecognitionEvent =
  // window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent,
  grammar =
    "#JSGF V1.0; grammar colors; public <color> = " +
    locale.getCurrentLocale().numbers.join(" | ") +
    " ;";

const recognition = new SpeechRecognition(),
  speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = locale.getCurrentLocaleCode();
recognition.interimResults = true;
recognition.maxAlternatives = 1;

export default recognition;
