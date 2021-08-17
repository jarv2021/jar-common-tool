<template>
  <div class="carousel-demo">
    <carousel :swiperList="swiperList" />
  </div>
</template>

<script>
import carousel from "./carousel";
export default {
  name: "carousel-demo",
  components: {
    carousel
  },
  data() {
    return {
      swiperList: []
    };
  },
  mounted() {
    this.swiperList = [
      {
        picture:
          "https://lh3.googleusercontent.com/proxy/t8Een_mp4aYuKd2zEp-lOcdnbmJ5McqSrw_BxM61wHAN2DUzIJxy4i1hFXB8dlLD9wHjkAONmPIAbJ2PLKprUBaRb2ehhq0EXF7Q3Iia-BA"
      },
      {
        picture:
          "https://lh3.googleusercontent.com/proxy/riT9d0kmXKv9fu7hdUlNuDNP4bn8XVTej0SjxQCi9uJ72LqFAyFWOA47oHj04lGq3Mw_XjiiILR_Lf0PjhcmQx8TPT0yYI6zoarsADmbx57AzVAdc0Lwpn5JWyojEOht"
      },
      {
        picture:
          "https://lh3.googleusercontent.com/proxy/kagFZuxLj5NKOC2kWnJxa2KPSmSNFOhEyk-jIX4QCwTGCnaXTybjxNS-Ldwi0rvtaZNhVkno7xRlOvYYJCOS2_0gJlHiGdq7M1PTaAIEntTq48LvkIJwMgPdWfWu7DFZhPY"
      },
      {
        picture: "https://c.53326.com/d/file/20180628/3wh2h2p0kvu.jpg"
      },
      {
        picture:
          "https://lh3.googleusercontent.com/proxy/2FfAQU7_7REuBuHlTgXnMfyf4W9YT_HCpd44FY-qfEldd7iZdA-eC8j9us5VIeJW709rS7gryVUDEVWf4AmfuzThcBn7ejGrY0ig4MBz7pu3qx1kupBBwOmabNEKbw"
      }
    ];
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.carousel-demo {
}
</style>
