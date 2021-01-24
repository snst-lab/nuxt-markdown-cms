import Vue from 'vue'

export const jsonld = (breadcrumbs) => {
    const items = breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@id": item.link,
          name: item.name,
        },
    }));
    return [
        {
        type: "application/ld+json",
        json: {
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: items,
        },
        },
    ]
}

Vue.prototype.jsonld = jsonld