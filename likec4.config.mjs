// @ts-check
import { defineConfig } from 'likec4/config'

export default defineConfig({
  // Project name (required)
  name: 'engineering-platform-data-model',
  
  // Folder containing .c4 files
  source: 'likec4',
  
  // Output configuration
  output: {
    // Static build folder
    dir: 'dist/diagrams',
  },
  
  // Development server configuration
  dev: {
    port: 5173,
    open: true,
  },
  
  // Image export
  export: {
    format: 'png',
    // Also supports 'svg', 'pdf', 'json', 'dot'
    output: 'dist/images',
  },
  
  // React codegen (optional)
  codegen: {
    output: 'src/likec4-views',
  },
})
