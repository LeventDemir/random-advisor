<template>
  <div>
    <Navbar />

    <br />
    <br />
    <br />

    <div class="container">
      <nuxt />
    </div>

    <br />
    <br />
    <br />

    <Footer />
  </div>
</template>


<script>
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default {
  components: { Navbar, Footer }
};
</script>