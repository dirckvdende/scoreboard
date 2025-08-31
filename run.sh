#!/bin/bash

# Start processes
npx tsc --watch >/dev/null & p1=$!
python3 -m http.server >/dev/null & p2=$!
sass --watch src/scss:src/css >/dev/null & p3=$!

echo "Started watching directories and started HTTP server"

# Function called when the process exits, to make sure child processes also exit
function endchildren() {
    kill $p1
    echo "Killed TypeScript watch command ($p1)"
    kill $p2
    echo "Killed Python http.server ($p2)"
    kill $p3
    echo "Killed SASS watch command ($p3)"
}

# Trap to call function when process exits
trap "endchildren" EXIT
# Don't end process without user input
wait