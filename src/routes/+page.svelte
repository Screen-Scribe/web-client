<script lang="ts">
  import * as Select from "$lib/components/ui/select";
  import type { T_Users } from "$lib/types";
  import { onMount } from "svelte";

  let users: T_Users = $state({});
  let selectedUser: string = $state("");

  onMount(() => {
    setInterval(() => {
      fetch("/api/manager/users", {
        method: "POST",
      }).then((res) => {
        res.json().then((res) => (users = res));
      });
    }, 5000);
  });

  $inspect(users);
</script>

<div class="px-16 py-24">
  <div class="mb-4">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Welcome Achal,
    </h1>
    <p class="opacity-50">You can view your employee's activities below</p>
  </div>
  <div class="mb-8">
    <Select.Root
      selected={selectedUser}
      onSelectedChange={(v) => {
        v && (selectedUser = v.value);
      }}
    >
      <Select.Trigger class="w-[180px] bg-white/70">
        <Select.Value placeholder="Select a user" />
      </Select.Trigger>
      <Select.Content>
        {#each Object.values(users) as user}
          <Select.Item value={user.id} label={user.name} />
        {/each}
      </Select.Content>
    </Select.Root>
  </div>
  {#if selectedUser.length > 0}
    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-6 items-center">
        <img
          class="max-h-24 rounded-full"
          src={users[selectedUser].dp}
          alt="dp"
        />
        <div>
          <h2 class="font-bold">{users[selectedUser].name}</h2>
          <p class="opacity-50">{users[selectedUser].email}</p>
          {#if !users[selectedUser].screenshots.map((ss) => ss.working).every((bool) => false)}
          <p>Suspicious Activity Found</p>
          {:else}
          <p>No Suspicious Activity Found</p>
          {/if}
        </div>
        <div></div>
      </div>
      <div class="flex flex-col gap-2">
        {#each users[selectedUser].screenshots as ss}
          <div class="flex flex-row p-4 rounded-xl gap-2" style={`background-color: ${
          ss.working ? "#26c1263a" : "#c126263a"
          }`}>
            <img style="width: 50%;" class="object-contain" alt="hehe" src={"data:image/jpeg;base64, " + ss.image} />
            <div class="flex flex-col gap-1" style="width: 50%;">
              {#each ss.response.split("\n").splice(1) as p}
                <p>{p}</p>
              {/each}
              <p class="mt-3">{(new Date(ss.timestamp)).toLocaleString()}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
