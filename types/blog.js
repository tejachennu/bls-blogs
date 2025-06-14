// Blog component types as JSDoc comments for better IDE support

/**
 * @typedef {'heading'|'paragraph'|'list'|'orderedList'|'alert'|'warning'|'image'|'link'|'button'|'separator'|'quote'|'card'|'section'|'container'|'grid'|'column'|'cta'|'form'|'table'} ComponentType
 */

/**
 * @typedef {Object} BaseComponent
 * @property {string} id
 * @property {ComponentType} type
 * @property {string} [className]
 */

/**
 * @typedef {Object} HeadingComponent
 * @property {string} id
 * @property {'heading'} type
 * @property {1|2|3|4|5|6} level
 * @property {string} content
 * @property {string} [anchor]
 * @property {string} [className]
 */

/**
 * @typedef {Object} ParagraphComponent
 * @property {string} id
 * @property {'paragraph'} type
 * @property {string} content
 * @property {string} [className]
 */

/**
 * @typedef {Object} ListItemComponent
 * @property {string} content
 * @property {ListItemComponent[]} [children]
 */

/**
 * @typedef {Object} ListComponent
 * @property {string} id
 * @property {'list'|'orderedList'} type
 * @property {ListItemComponent[]} items
 * @property {string} [className]
 */

/**
 * @typedef {Object} AlertComponent
 * @property {string} id
 * @property {'alert'|'warning'} type
 * @property {string} [title]
 * @property {string} content
 * @property {'default'|'destructive'|'success'|'info'} [variant]
 * @property {string} [className]
 */

/**
 * @typedef {Object} ImageComponent
 * @property {string} id
 * @property {'image'} type
 * @property {string} src
 * @property {string} alt
 * @property {number} [width]
 * @property {number} [height]
 * @property {string} [className]
 */

/**
 * @typedef {Object} LinkComponent
 * @property {string} id
 * @property {'link'} type
 * @property {string} href
 * @property {string} content
 * @property {boolean} [isExternal]
 * @property {string} [className]
 */

/**
 * @typedef {Object} ButtonComponent
 * @property {string} id
 * @property {'button'} type
 * @property {string} content
 * @property {string} [href]
 * @property {'default'|'destructive'|'outline'|'secondary'|'ghost'|'link'} [variant]
 * @property {'default'|'sm'|'lg'|'icon'} [size]
 * @property {string} [onClick]
 * @property {string} [className]
 */

/**
 * @typedef {Object} SeparatorComponent
 * @property {string} id
 * @property {'separator'} type
 * @property {string} [className]
 */

/**
 * @typedef {Object} QuoteComponent
 * @property {string} id
 * @property {'quote'} type
 * @property {string} content
 * @property {string} [author]
 * @property {string} [className]
 */

/**
 * @typedef {Object} CardComponent
 * @property {string} id
 * @property {'card'} type
 * @property {string} [title]
 * @property {string} [content]
 * @property {BlogComponent[]} [children]
 * @property {string} [className]
 */

/**
 * @typedef {Object} SectionComponent
 * @property {string} id
 * @property {'section'|'container'} type
 * @property {BlogComponent[]} children
 * @property {string} [background]
 * @property {string} [className]
 */

/**
 * @typedef {Object} GridComponent
 * @property {string} id
 * @property {'grid'} type
 * @property {number} columns
 * @property {BlogComponent[]} children
 * @property {string} [className]
 */

/**
 * @typedef {Object} ColumnComponent
 * @property {string} id
 * @property {'column'} type
 * @property {BlogComponent[]} children
 * @property {number} [span]
 * @property {string} [className]
 */

/**
 * @typedef {Object} CTAComponent
 * @property {string} id
 * @property {'cta'} type
 * @property {string} title
 * @property {string} [description]
 * @property {string} buttonText
 * @property {string} buttonHref
 * @property {string} [className]
 */

/**
 * @typedef {Object} TableComponent
 * @property {string} id
 * @property {'table'} type
 * @property {string[]} headers
 * @property {string[][]} rows
 * @property {string} [className]
 */

/**
 * @typedef {HeadingComponent|ParagraphComponent|ListComponent|AlertComponent|ImageComponent|LinkComponent|ButtonComponent|SeparatorComponent|QuoteComponent|CardComponent|SectionComponent|GridComponent|ColumnComponent|CTAComponent|TableComponent} BlogComponent
 */

/**
 * @typedef {Object} BlogPost
 * @property {string} id
 * @property {string} title
 * @property {string} slug
 * @property {Object} author
 * @property {string} author.name
 * @property {string} [author.avatar]
 * @property {string} [author.role]
 * @property {string} date
 * @property {string} [readTime]
 * @property {string} [excerpt]
 * @property {string} [featuredImage]
 * @property {string[]} [tags]
 * @property {string[]} [categories]
 * @property {BlogComponent[]} content
 * @property {Object[]} [relatedPosts]
 * @property {string} relatedPosts[].id
 * @property {string} relatedPosts[].title
 * @property {string} relatedPosts[].slug
 * @property {string} [relatedPosts[].featuredImage]
 * @property {string} [relatedPosts[].excerpt]
 */

export {}
