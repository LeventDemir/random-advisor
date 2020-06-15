<template>
  <main>
    <header>
      <Navbar />
    </header>

    <br />
    <br />
    <br />

    <main class="container">
      <nuxt />
    </main>

    <br />
    <br />
    <br />

    <Footer />
  </main>
</template>


<script>
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default {
  components: { Navbar, Footer }
};
</script>