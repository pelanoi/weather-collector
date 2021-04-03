cleanup ()
{
exit 0
}

trap cleanup SIGINT SIGTERM

while true; do
  rtl_433 -R 32 -F json -E quit | node forward-payload.js
done
