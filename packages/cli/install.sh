#!/bin/bash

# Constants and configurable variables
NODE_VERSION="20.10.0"

# Set current user and home directory
CURRENT_USER=$(whoami)
USER_HOME=$(eval echo ~"$CURRENT_USER")

# Determine if the user is using bash or zsh
if [ "$SHELL" == */bash ]; then
    PROFILE_PATH="$USER_HOME/.profile"
    echo "Using bash, setting up in .profile"
elif [ "$SHELL" == */zsh ]; then
    PROFILE_PATH="$USER_HOME/.zshrc"
    echo "Using zsh, setting up in .zshrc"
else
    echo "Unsupported shell: $SHELL. Defaulting to .profile"
    PROFILE_PATH="$USER_HOME/.profile"
fi

echo "Current user: $CURRENT_USER"
echo "User home directory: $USER_HOME"
echo "Profile path: $PROFILE_PATH"
set -e  # exit immediately if a command exits with a non-zero status

check_command() {
    command -v "$1" >/dev/null 2>&1 || { 
        echo >&2 "I require $1 but it's not installed. Aborting."; 
        exit 1; 
    }
}

install_nodenv_and_node() {
    check_command "git"
    check_command "npm"



    if [ ! -d "$USER_HOME/.nodenv" ]; then
        echo "Installing nodenv..."
        git clone https://github.com/nodenv/nodenv.git "$USER_HOME/.nodenv"
        echo 'export PATH="'$USER_HOME'/.nodenv/bin:$PATH"' >> "$PROFILE_PATH"
        echo 'eval "$('$USER_HOME'/.nodenv/bin/nodenv init -)"' >> "$PROFILE_PATH"
        . "$PROFILE_PATH"
    else
        echo "nodenv already installed."
    fi

    NODE_BUILD_PATH="$("$USER_HOME/.nodenv/bin/nodenv" root)/plugins/node-build"
    if [ ! -d "$NODE_BUILD_PATH" ]; then
        echo "Installing node-build..."
        git clone https://github.com/nodenv/node-build.git "$NODE_BUILD_PATH"
    else
        echo "node-build already installed."
    fi

    if ! "$USER_HOME/.nodenv/bin/nodenv" versions | grep -q "$NODE_VERSION"; then
        echo "Installing node $NODE_VERSION..."
        "$USER_HOME/.nodenv/bin/nodenv" install "$NODE_VERSION"
        "$USER_HOME/.nodenv/bin/nodenv" global "$NODE_VERSION"
        echo "Node installation completed!"
    else
        echo "Node $NODE_VERSION already installed."
    fi

    echo "Installing @skeet-framework/cli..."
    npm i -g @skeet-framework/cli

    echo "Installing firebase-tools..."
    npm i -g firebase-tools

    echo "Sourcing $PROFILE_PATH..."
    . "$PROFILE_PATH"
}

install_java_with_sdkman() {
    echo $USER_HOME
    if [ -d "$USER_HOME/.sdkman" ]; then
        echo "SDKMAN already installed."
    else
        echo "Installing SDKMAN..."
        curl -s "https://get.sdkman.io" | bash
    fi

    # Source SDKMAN scripts for the current shell session
    SDKMAN_INIT_SCRIPT="$USER_HOME/.sdkman/bin/sdkman-init.sh"
    if [ -f "$SDKMAN_INIT_SCRIPT" ]; then
        source "$SDKMAN_INIT_SCRIPT"
    fi

    if type sdk > /dev/null; then
        echo "Installing Java using SDKMAN..."
        sdk install java
        echo "Java installation completed!"
    else
        echo "Error initializing SDKMAN."
    fi

    # Call the function to add SDKMAN to profile
    add_sdkman_to_profile
}


# Add SDKMAN initialization to profile if not already present
add_sdkman_to_profile() {
    SDKMAN_INIT_SCRIPT="$USER_HOME/.sdkman/bin/sdkman-init.sh"

    # Check if SDKMAN init script is already added to the profile
    if grep -q "source \"$SDKMAN_INIT_SCRIPT\"" "$PROFILE_PATH"; then
        echo "SDKMAN initialization already added to $PROFILE_PATH."
    else
        echo "Adding SDKMAN initialization to $PROFILE_PATH."
        # Use the actual path instead of the variable name
        echo "source $SDKMAN_INIT_SCRIPT" >> "$PROFILE_PATH"
    fi
}

main() {
    for arg in "$@"; do
      case "$arg" in
        -h|--help)
          cat <<EOF
Custom Install Script
Installs nodenv, node $NODE_VERSION, and sets it as the global version.
Additionally, installs the @skeet-framework/cli package globally.

USAGE:
    ${0##*/} [FLAGS]

FLAGS:
    -h, --help              Prints help information
EOF
          exit 0
          ;;
        *)
          ;;
      esac
    done

    install_java_with_sdkman
    install_nodenv_and_node
    skeet log -aa
}

main "$@"
