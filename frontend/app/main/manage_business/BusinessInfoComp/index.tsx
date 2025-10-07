import { useServiceProviders } from "@/context/ServiceProvidersProvider";
import { ServiceProvider } from "@/context/ServiceProvidersProvider/types";
import { useCurrentUser } from "@/context/UserProvider";
import { memo, useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Chip, Surface, Text } from "react-native-paper";
import { BusinessInfoCompProps } from "./types";

const BusinessInfoComp = ({ style }: BusinessInfoCompProps) => {
    const [provider, setProvider] = useState<ServiceProvider | null>(null);
    const [user] = useCurrentUser();

    const providers = useServiceProviders();

    useEffect(() => {
        fetchProvider();
    }, []);

    const fetchProvider = useCallback(async () => {
        if (!user) return;

        try {
            const p = await providers.getOneByProviderEmail(user.email);

            setProvider(p);
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <View style={{ ...styles.container, ...style }}>
            {!provider ? (
                <ActivityIndicator
                    animating
                    size={"small"}
                />
            ) : (
                <>
                    <Surface mode="flat" style={styles.block}>
                        <Text variant="bodySmall">Business Name</Text>
                        <Text variant="bodyLarge">{provider.name}</Text>
                    </Surface>

                    <Surface mode="flat" style={styles.block}>
                        <Text variant="bodySmall">Welcome Note</Text>
                        <Text variant="bodyLarge">{provider.welcomeNote}</Text>
                    </Surface>

                    <Surface mode="flat" style={styles.block}>
                        <Text variant="bodySmall">Contact Number</Text>
                        <Text variant="bodyLarge">{provider.contactNumber}</Text>
                    </Surface>

                    <Surface mode="flat" style={styles.block}>
                        <Text variant="bodySmall">Address</Text>
                        <Text variant="bodyLarge">{provider.address}</Text>
                    </Surface>

                    <Surface mode="flat" style={styles.block}>
                        <Text variant="bodySmall">Business Email</Text>
                        <Text variant="bodyLarge">{provider.businessEmail}</Text>
                    </Surface>

                    <Surface mode="flat" style={styles.block}>
                        <Text variant="bodySmall">Rating</Text>
                        <Text variant="bodyLarge">{provider.rating}</Text>
                    </Surface>

                    <Surface mode="flat" style={styles.block}>
                        <Text variant="bodySmall">Tags</Text>
                        <View style={styles.tagsContainer}>
                            {provider.tags.split(",").map((t, idx) => (
                                <Chip
                                    key={idx}
                                    mode="outlined"
                                >{t}</Chip>
                            ))}
                        </View>
                    </Surface>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
    },
    block: {
        padding: 10,
        gap: 5,
        borderRadius: 5
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5
    },
});

export default memo(BusinessInfoComp);