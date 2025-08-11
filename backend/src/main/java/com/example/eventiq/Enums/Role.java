package com.example.eventiq.Enums;

import java.util.HashMap;

public enum Role {
    ADMIN(0),
    CONSUMER(1),
    PROVIDER(2);

    private int value;
    private static final HashMap<Integer, Role> map = new HashMap<>();

    private Role(int value) {
        this.value = value;
    }

    static {
        for(var role : Role.values())
            map.put(role.value, role);
    }

    public static Role roleOf(int val) {
        return map.get(val);
    }
}
