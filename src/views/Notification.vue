<template>
  <div class="columns">
    <div class="two-thirds column centered">
      <h1>Hello there!</h1>
      <p>Fill in your email and click the button below to subscribe to notifications.</p>
      <form v-on:submit.prevent="subscribe">
        <label for="email">Email address</label>
        <input class="form-control" type="email" id="email" v-model="email" required>
        <button v-cloak class="btn" type="submit" v-bind:disabled="buttonDisable || emailInvalid" v-text="buttonText">Enable Push Messages</button>
        <button v-cloak v-if="isPushEnabled" class="btn btn-danger" type="button" v-on:click.prevent="unsubscribe" v-bind:disabled="buttonDisableDisable"><span v-if="emailInvalid">Enter An Email To Unsubscribe</span><span v-else>Disable Push Messages</span></button>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>
