<script>
  import { locale } from "./locale.js";
  import recognition from "./recognition.js";
  let selectedLocaleCode = locale.getCurrentLocaleCode();
</script>

<style>
  div,
  select {
    font-size: 0.8rem;
  }
</style>
<div>
  {$locale.language}: 
  <select 
    bind:value={selectedLocaleCode} 
    on:change={() => { 
      locale.setLocale(selectedLocaleCode); 
      if (recognition) recognition.lang = locale.getCurrentLocaleCode();
    }}>
    {#each locale.getAvailableLocales() as [code, name]}
		  <option value="{code}">{name}</option>
    {/each}
	</select>
</div>