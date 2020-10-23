<script>
  import { numbers } from "./data.js";
  import { locale as l } from "./locale.js";
  import Button from "./Button.svelte";
  import LocaleSelector from "./LocaleSelector.svelte";
  import recognition from "./recognition.js";

  const STARTING = "STARTING",
    STARTED = "STARTED",
    FAILED = "FAILED",
    GUESSED = "GUESSED",
    SUCCESS_EMOJI = "✅",
    FAIL_EMOJI = "⛔️",
    TIMEOUT = 900;

  let gameState = STARTING,
    digit,
    emoji,
    hint,
    full = "",
    current = "";

  function setGameState(newState) {
    if (gameState == newState) return;
    switch (newState) {
      case STARTED:
        setNextDigit();
        break;
    }
    gameState = newState;
    console.log(`Game state: ${gameState}`);
  }

  function setNextDigit() {
    let newDigit;
    while (digit === (newDigit = Math.floor(Math.random() * 10))) {}
    digit = newDigit;
    console.log(`Set new digit: ${digit}`);
  }

  function onCorrectDigit() {
    console.log("Pronounced correct digit!!!");
    emoji = SUCCESS_EMOJI;
    recognition.abort();
    setTimeout(() => {
      emoji = null;
      recognition.start();
      setNextDigit();
    }, TIMEOUT);
  }

  function onFail() {
    emoji = FAIL_EMOJI;
    setTimeout(() => {
      emoji = null;
    }, TIMEOUT);
  }

  recognition.onresult = function(event) {
    console.log(event);
    const result = event.results[event.resultIndex];
    const transcript = result[0].transcript.toLowerCase();
    hint = transcript;
    console.log("Result received: " + transcript + ".");
    console.log("Confidence: " + result.confidence);
    if (
      transcript.indexOf(digit) >= 0 ||
      transcript.indexOf($l.numbers[digit]) >= 0
    ) {
      onCorrectDigit();
    } else {
      // onFail();
    }
  };

  recognition.onnomatch = function(event) {
    console.log("No match...");
  };

  recognition.onerror = function(event) {
    console.log(`Error: ${event.error}`);
  };

  function start() {
    recognition.start();
    setGameState(STARTED);
  }
</script>

<style>
  :global(body) {
    margin: 0;
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Helvetica,
      Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-kerning: normal;
    -moz-font-feature-settings: "kern", "liga", "clig", "calt";
    -ms-font-feature-settings: "kern", "liga", "clig", "calt";
    -webkit-font-feature-settings: "kern", "liga", "clig", "calt";
    font-feature-settings: "kern", "liga", "clig", "calt";
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  main {
    font-family: sans-serif;
    text-align: center;
  }

  main h1 {
    margin-block-start: 0.8em;
  }

  main p {
    width: 75%;
    max-width: 30em;
    margin: 1em auto;
  }

  article {
    margin: 0 auto;
    padding: 0;
  }

  article h1 {
    padding: 0;
    margin: 0;
    font-size: 50vh;
    line-height: 50vh;
  }
</style>

<main>
	<h1>{$l.header}</h1>
  {#if gameState == STARTING}
    <LocaleSelector />
  {/if}
  <p>{$l.info}</p>
  {#if gameState == STARTING}
	  <Button on:click={start} />
  {:else}
    <article><h1>{emoji || digit}</h1></article>
  {/if}
  <p><small>{$l.hint}</small> {hint || $l.nothingYet}</p>
</main>
