<script setup lang="ts">
import VmoAES from '@lib';
const cropty = new VmoAES('asd!qwertyuighjk');
console.log(cropty.getKey())
const str = cropty.enCryptoString('okokokokokokkokokokokokoko');
console.log(cropty.deCryptoString(str),str)
</script>

<template>
  <!-- <div class="flex flex-col flex-grow items-center justify-center">
    <vmo-button perfix="ssee">aaaa</vmo-button>
  </div> -->
</template>

<style>
html,body{
    height: 100%;
    display: flex;
    flex-grow: 1;
}
</style>
