# MC plus

## init shell

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
