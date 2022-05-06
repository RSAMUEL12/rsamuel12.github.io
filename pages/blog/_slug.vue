<template>
  <article>
    <nuxt-content :document="article" />
    <p>Post last updated: {{ article.updatedAt }}</p>
    <pre> {{ article }} </pre>
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch();

    return { article };
  },
};
</script>
