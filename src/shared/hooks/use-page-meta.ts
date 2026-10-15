import { watchEffect } from "vue";
import type { Router } from "vue-router";

import { DEFAULT_TITLE, SITE_NAME } from "@shared/config";

interface RouteMeta {
  title?: string;
}

export const usePageMeta = (router: Router) => {
  watchEffect(() => {
    const meta = router.currentRoute.value.meta as RouteMeta;

    document.title = meta.title ? `${meta.title} — ${SITE_NAME}` : DEFAULT_TITLE;
  });
};
