<script>
  import { SignIn, SignOut } from "@auth/sveltekit/components";
  import { page } from "$app/stores";
  $: console.log($page.data.session);
</script>

<h1>SvelteKit Auth Example</h1>
<p>
  {#if $page.data.session}
    <span class="signedInText">
      <small>Signed in as</small><br />
      <strong>{$page.data.session.user?.name ?? "User"}</strong>
    </span>
    <SignOut>Sign out</SignOut>
  {:else}
    <span class="notSignedInText">You are not signed in</span>
    <SignIn provider="credentials">
      <div slot="credentials">
        <label class="label" for="email">Email</label>
        <input
          class="input"
          type="email"
          id="email"
          name="email"
          value="test@test.com"
          required
        />

        <label class="label" for="password">Password</label>
        <input
          class="input"
          type="password"
          id="password"
          name="password"
          value="test"
          required
        />
      </div>
    </SignIn>
  {/if}
</p>
