# MC plus

## dependencies

init shell

```zsh
cd packages
mkdir -p components core docs hooks theme utils

# init pnpm
for dir in components core docs hooks theme utils; do
	cd $dir
	pnpm init
	cd ..
done

echo "init succeed!"
```

### workspace:

```zsh
# dev
pnpm add -Dw typescript@^5.2.2 vite@^5.1.4 vitest@^1.4.0 vue-tsc@^1.8.27 postcss-color-mix@^1.1.0 postcss-each@^1.1.0 postcss-each-variables@^0.3.0 postcss-for@^2.1.1 postcss-nested@^6.0.1 @types/node@^20.11.20 @types/lodash-es@^4.17.12 @vitejs/plugin-vue@^5.0.4 @vitejs/plugin-vue-jsx@^3.1.0 @vue/tsconfig@^0.5.1

# prod
pnpm add -w lodash-es@^4.17.21 vue@^3.4.19
```

### components:

```zsh
# dev
pnpm add -D @vue/test-utils@^2.4.5 @vitest/coverage-v8@^1.4.0 jsdom@^24.0.0 --filter @mc-plus/components

# prod
pnpm add @popperjs/core@^2.11.8 async-validator@^4.2.5 --filter @mc-plus/components
```

## docs

```zsh
# dev
pnpm add -D vitepress@1.0.0-rc.44 --filter @mc-plus/docs

# prod
pnpm add @popperjs/core@^2.11.8 async-validator@^4.2.5 --filter @mc-plus/components
```
