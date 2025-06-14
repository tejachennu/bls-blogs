import { DynamicComponent } from "@/components/blog/dynamic-components"
import { BasicComponent } from "@/components/blog/basic-components"

export function ComponentRenderer({ component, isPreview = false }) {
  // Handle basic components
  if (component.type?.startsWith("basic")) {
    // Convert basicHeading to heading, basicParagraph to paragraph, etc.
    const basicComponent = {
      ...component,
      type: component.type.replace("basic", "").toLowerCase(),
    }
    return <BasicComponent component={basicComponent} />
  }

  // Handle styled/dynamic components
  return <DynamicComponent component={component} />
}
